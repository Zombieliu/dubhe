module constantinople::encounter_system {
    use constantinople::encounter_schema::Encounter;
    use constantinople::encounter_monster_catch_result;
    use constantinople::encounter_event_monster_catch_attempt;
    use constantinople::encounter_error_not_in_encounter;
    use sui::random::Random;
    use sui::random;
    use constantinople::entity_schema::Entity;
    use constantinople::map_schema::Map;

    public fun throw_ball(map: &mut Map, entity: &mut Entity, encounter: &mut Encounter , random: &Random, ctx: &mut TxContext) {
        let player = ctx.sender();

        encounter_error_not_in_encounter::require(encounter.borrow_monster_info().contains_key(player));

        let (monster, catch_attempts) = encounter.borrow_monster_info().get(player).get();

        let mut generator = random::new_generator(random, ctx);
        let rand = random::generate_u256(&mut generator);

        if (rand % 2 == 0) {
            // 50% chance to catch monster
            encounter_event_monster_catch_attempt::emit(player, monster, encounter_monster_catch_result::new_caught());
            entity.borrow_mut_owned_by().set(monster, player);
            encounter.borrow_mut_monster_info().remove(player);
        } else if (catch_attempts >= 2) {
            // Missed 2 times, monster escapes
            encounter_event_monster_catch_attempt::emit(player, monster, encounter_monster_catch_result::new_fled());
            entity.borrow_mut_monster().remove(monster);
            encounter.borrow_mut_monster_info().remove(player);
        } else {
            // Throw missed!
            encounter_event_monster_catch_attempt::emit(player, monster, encounter_monster_catch_result::new_missed());
            encounter.borrow_mut_monster_info().mutate!(player, |encounter| {
                encounter.set_catch_attempts(catch_attempts + 1);
            });
        }
}

    public fun flee(map: &mut Map, entity: &mut Entity, encounter: &mut Encounter, ctx: &mut TxContext) {
        let player = ctx.sender();

        encounter_error_not_in_encounter::require(encounter.borrow_monster_info().contains_key(player));

        let monster_info  = encounter.borrow_monster_info().get(player);
        entity.borrow_mut_monster().remove(monster_info.get_monster());
        encounter.borrow_mut_monster_info().remove(player);
    }
}