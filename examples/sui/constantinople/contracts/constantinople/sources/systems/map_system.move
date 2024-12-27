module constantinople::map_system {
    use std::debug;
    use sui::bcs;
    use constantinople::encounter_monster_info;
    use constantinople::encounter_schema::Encounter;
    use sui::address;
    use sui::random::{Random, RandomGenerator};
    use sui::random;
    use constantinople::map_direction;
    use constantinople::map_direction::Direction;
    use constantinople::not_registered_error;
    use constantinople::cannot_move_error;
    use constantinople::space_obstructed_error;
    use constantinople::entity_schema::Entity;
    use constantinople::already_registered_error;
    use constantinople::map_schema::Map;
    use constantinople::map_position;
    use constantinople::entity_monster_type;

    public fun register(map: &mut Map, entity: &mut Entity,  x: u64, y: u64, ctx: &mut TxContext) {
        let player = ctx.sender();
        already_registered_error::require(!entity.player().contains_key(player));
        // Constrain position to map size, wrapping around if necessary
        let (width, height, _) = map.config().get().get();
        let x = (x + width) % width;
        let y = (y + height) % height;

        let space_addr = position_to_address(x, y);
        if(entity.obstruction().contains_key(space_addr)) {
            space_obstructed_error::require(!entity.obstruction().get(space_addr));
        };
        entity.player().set(player, true);
        entity.moveable().set(player, true);
        entity.encounterable().set(player, true);
        map.position().set(player, map_position::new(x, y));
    }


    fun start_encounter(entity: &mut Entity,  encounter: &mut Encounter, generator: &mut RandomGenerator, player: address) {
        let monster = random::generate_u256(generator);
        let mut monster_type = entity_monster_type::new_none();
        if (monster % 4 == 1) {
            monster_type = entity_monster_type::new_eagle();
        } else if (monster % 4 == 2) {
            monster_type = entity_monster_type::new_rat();
        } else if (monster % 4 == 3) {
            monster_type = entity_monster_type::new_caterpillar();
        };

        let monster = address::from_u256(monster);
        entity.monster().set(monster, monster_type);
        let monster_info = encounter_monster_info::new(monster, 0);
        encounter.monster_info().set(player, monster_info);
    }

    public fun move_position(map: &mut Map, entity: &mut Entity, encounter: &mut Encounter, random: &Random, direction: Direction, ctx: &mut TxContext) {
        let player = ctx.sender();
        not_registered_error::require(entity.moveable().contains_key(player));
        cannot_move_error::require(entity.moveable().get(player));
        // Cannot move during an encounter
        cannot_move_error::require(!encounter.monster_info().contains_key(player));

        let (mut x, mut y) = map.position().get(player).get();
        if (direction == map_direction::new_north()) {
            y = y - 1;
        } else if (direction == map_direction::new_east()) {
            x = x + 1;
        } else if (direction == map_direction::new_south()) {
            y = y + 1;
        } else if (direction == map_direction::new_west()) {
            x = x - 1;
        };

        // Constrain position to map size, wrapping around if necessary
        let (width, height, _) = map.config().get().get();
        let x = (x + width) % width;
        let y = (y + height) % height;

        let space_addr = position_to_address(x, y);
        if(entity.obstruction().contains_key(space_addr)) {
            space_obstructed_error::require(!entity.obstruction().get(space_addr));
        };

        map.position().set(player, map_position::new(x, y));

        let mut generator = random::new_generator(random, ctx);
        let rand = random::generate_u256(&mut generator);
        debug::print(&rand);
        if (rand % 5 == 0) {
            start_encounter(entity, encounter, &mut generator, player);
        }
    }

    public fun position_to_address(x: u64, y: u64): address {
        let mut x = bcs::to_bytes(&(x as u128));
        let mut y = bcs::to_bytes(&(y as u128));
        x.append(y);
        address::from_bytes(x)
    }
}
