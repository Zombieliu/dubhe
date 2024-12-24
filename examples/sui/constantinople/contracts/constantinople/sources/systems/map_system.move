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
    use constantinople::map_error_not_registered;
    use constantinople::entity_error_cannot_move;
    use constantinople::map_error_space_obstructed;
    use constantinople::entity_schema::Entity;
    use constantinople::map_error_already_registered;
    use constantinople::map_schema::Map;
    use constantinople::map_position;
    use constantinople::entity_monster_type;

    public fun register(map: &mut Map, entity: &mut Entity,  x: u64, y: u64, ctx: &mut TxContext) {
        let player = ctx.sender();
        map_error_already_registered::require(!entity.borrow_player().contains_key(player));
        // Constrain position to map size, wrapping around if necessary
        let (width, height, _) = map.borrow_config().get().get();
        let x = (x + width) % width;
        let y = (y + height) % height;

        let space_addr = position_to_address(x, y);
        if(entity.borrow_obstruction().contains_key(space_addr)) {
            map_error_space_obstructed::require(!entity.borrow_obstruction().get(space_addr));
        };
        entity.borrow_mut_player().insert(player, true);
        entity.borrow_mut_moveable().insert(player, true);
        entity.borrow_mut_encounterable().insert(player, true);
        map.borrow_mut_position().insert(player, map_position::new(x, y));
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

        entity.borrow_mut_monster().set(monster, monster_type);
        encounter.borrow_mut_monster_info().set(player, encounter_monster_info::new(monster, 0));
    }

    public fun move_position(map: &mut Map, entity: &mut Entity, encounter: &mut Encounter, random: &Random, direction: Direction, ctx: &mut TxContext) {
        let player = ctx.sender();
        map_error_not_registered::require(entity.borrow_moveable().contains_key(player));
        entity_error_cannot_move::require(entity.borrow_moveable().get(player));
        // Cannot move during an encounter
        entity_error_cannot_move::require(!encounter.borrow_monster_info().contains_key(player));

        let (mut x, mut y) = map.borrow_position().get(player).get();
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
        let (width, height, _) = map.borrow_config().get().get();
        let x = (x + width) % width;
        let y = (y + height) % height;

        let space_addr = position_to_address(x, y);
        if(entity.borrow_obstruction().contains_key(space_addr)) {
            map_error_space_obstructed::require(!entity.borrow_obstruction().get(space_addr));
        };

        map.borrow_mut_position().set(player, map_position::new(x, y));

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
