module constantinople::encounter_system {
    use constantinople::encounter_schema::Encounter;
    use constantinople::encounter_monster_catch_result;
    use constantinople::monster_catch_attempt_event;
    use constantinople::not_in_encounter_error;
    use sui::random::Random;
    use sui::random;
    use constantinople::entity_schema::Entity;
    use constantinople::map_schema::Map;

    public fun throw_ball(map: &mut Map, entity: &mut Entity, encounter: &mut Encounter , random: &Random, ctx: &mut TxContext) {
        let player = ctx.sender();

        not_in_encounter_error::require(encounter.monster_info().contains_key(player));

        let (monster, catch_attempts) = encounter.monster_info().get(player).get();

        let mut generator = random::new_generator(random, ctx);
        let rand = random::generate_u256(&mut generator);

        if (rand % 2 == 0) {
            // 50% chance to catch monster
            monster_catch_attempt_event::emit(player, monster, encounter_monster_catch_result::new_caught());
            entity.owned_by().set(monster, player);
            encounter.monster_info().remove(player);
        } else if (catch_attempts >= 2) {
            // Missed 2 times, monster escapes
            monster_catch_attempt_event::emit(player, monster, encounter_monster_catch_result::new_fled());
            entity.monster().remove(monster);
            encounter.monster_info().remove(player);
        } else {
            // Throw missed!
            monster_catch_attempt_event::emit(player, monster, encounter_monster_catch_result::new_missed());
            encounter.monster_info().mutate!(player, |encounter| {
                encounter.set_catch_attempts(catch_attempts + 1);
            });
        }
}

    public fun flee(entity: &mut Entity, encounter: &mut Encounter, ctx: &mut TxContext) {
        let player = ctx.sender();

        not_in_encounter_error::require(encounter.monster_info().contains_key(player));

        let monster_info  = encounter.monster_info().get(player);
        entity.monster().remove(monster_info.get_monster());
        encounter.monster_info().remove(player);
    }
}