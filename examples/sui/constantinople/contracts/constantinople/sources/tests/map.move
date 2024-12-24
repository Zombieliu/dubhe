#[test_only]
module constantinople::map_test {
    use std::debug;
    use sui::random::Random;
    use sui::random;
    use sui::test_scenario;
    use sui::address;
    use constantinople::map_system;
    use constantinople::entity_schema::Entity;
    use constantinople::map_schema::Map;
    use constantinople::map_direction;
    use constantinople::encounter_schema::Encounter;
    use constantinople::init_test;
    use sui::bcs;

    #[test]
    public fun register(){
       let (mut scenario, dapp) = init_test::deploy_dapp_for_testing(@0xA);
        let mut map = test_scenario::take_shared<Map>(&scenario);
        let mut entity = test_scenario::take_shared<Entity>(&scenario);
        let mut encounter = test_scenario::take_shared<Encounter>(&scenario);

        let mut ctx = test_scenario::ctx(&mut scenario);
        map_system::register(&mut map, &mut entity, 0, 0, ctx);

        assert!(entity.borrow_player().contains_key(ctx.sender()));
        assert!(entity.borrow_moveable().contains_key(ctx.sender()));
        assert!(entity.borrow_encounterable().contains_key(ctx.sender()));
        assert!(map.borrow_position().contains_key(ctx.sender()));

        test_scenario::return_shared(encounter);
        test_scenario::return_shared(entity);
        test_scenario::return_shared(map);
        dapp.distroy_dapp_for_testing();
        scenario.end();
    }

    #[test]
    public fun move_position(){
        let (mut scenario, dapp) = init_test::deploy_dapp_for_testing(@0x0);
        {
            random::create_for_testing(scenario.ctx());
            scenario.next_tx(@0xA);
        };

        let mut map = test_scenario::take_shared<Map>(&scenario);
        let mut entity = test_scenario::take_shared<Entity>(&scenario);
        let mut encounter = test_scenario::take_shared<Encounter>(&scenario);
        let mut random = test_scenario::take_shared<Random>(&scenario);

        let mut ctx = test_scenario::ctx(&mut scenario);
        map_system::register(&mut map, &mut entity, 0, 0, ctx);

        map_system::move_position(
            &mut map,
            &mut entity,
            &mut encounter,
            &mut random,
            map_direction::new_east(),
            ctx
        );

        test_scenario::return_shared(random);
        test_scenario::return_shared(encounter);
        test_scenario::return_shared(entity);
        test_scenario::return_shared(map);

        dapp.distroy_dapp_for_testing();
        scenario.end();
    }
}