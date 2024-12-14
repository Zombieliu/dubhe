import { DubheConfig } from '../../types';
import { formatAndWriteMove } from '../formatAndWrite';
import { existsSync } from 'fs';
import { capitalizeAndRemoveUnderscores } from './generateSchema';

export async function generateDefaultSchema(
	config: DubheConfig,
	srcPrefix: string
) {
	await generateDappSchemaMetadata(config, srcPrefix);
	await generateDappSchema(config, srcPrefix);
	await generateDappSystem(config, srcPrefix);
}

async function generateDappSchemaMetadata(config: DubheConfig, srcPrefix: string) {
	const path = `${srcPrefix}/contracts/${config.name}/sources/codegen/schemas/default/dapp/metadata.move`
	if (!existsSync(path)) {
		let code = `module ${config.name}::dapp_metadata {
    use std::ascii::String;

    public struct DappMetadata has drop, copy, store {
        name: String,
        description: String,
        icon_url: String,
        website_url: String,
        created_at: u64,
        partners: vector<String>,
    }

    public fun new(
        name: String,
        description: String,
        icon_url: String,
        website_url: String,
        created_at: u64,
        partners: vector<String>,
    ): DappMetadata {
        DappMetadata {
            name,
            description,
            icon_url,
            website_url,
            created_at,
            partners,
        }
    }

    public fun set(
        self: &mut DappMetadata,
        name: String,
        description: String,
        icon_url: String,
        website_url: String,
        created_at: u64,
        partners: vector<String>,
    ) {
        self.name = name;
        self.description = description;
        self.icon_url = icon_url;
        self.website_url = website_url;
        self.created_at = created_at;
        self.partners = partners;
    }

    public fun set_name(self: &mut DappMetadata, name: String) {
        self.name = name;
    }

    public fun set_description(self: &mut DappMetadata, description: String) {
        self.description = description;
    }

    public fun set_icon_url(self: &mut DappMetadata, icon_url: String) {
        self.icon_url = icon_url;
    }

    public fun set_website_url(self: &mut DappMetadata, website_url: String) {
        self.website_url = website_url;
    }

    public fun set_created_at(self: &mut DappMetadata, created_at: u64) {
        self.created_at = created_at;
    }

    public fun set_partners(self: &mut DappMetadata, partners: vector<String>) {
        self.partners = partners;
    }

    public fun get_name(self: DappMetadata): String {
        self.name
    }

    public fun get_description(self: DappMetadata): String {
        self.description
    }

    public fun get_icon_url(self: DappMetadata): String {
        self.icon_url
    }

    public fun get_website_url(self: DappMetadata): String {
        self.website_url
    }

    public fun get_created_at(self: DappMetadata): u64 {
        self.created_at
    }

    public fun get_partners(self: DappMetadata): vector<String> {
        self.partners
    }

}
`;
		await formatAndWriteMove(
			code,
			path,
			'formatAndWriteMove'
		);
	}
}


async function generateDappSchema(config: DubheConfig, srcPrefix: string) {
	const path = `${srcPrefix}/contracts/${config.name}/sources/codegen/schemas/default/dapp/schema.move`
	if (!existsSync(path)) {
		let code = `module ${config.name}::dapp_schema {
    use ${config.name}::dapp_metadata::DappMetadata;
    use dubhe::storage_value;
    use dubhe::storage_value::StorageValue;
    use dubhe::storage_migration;
    use sui::transfer::public_share_object;
    use dubhe::type_info;

    public struct Dapp has key, store { id: UID }

    public fun borrow_admin(self: &Dapp): &StorageValue<address> {
        storage_migration::borrow_field(&self.id, b"admin")
    }

    public(package) fun borrow_mut_admin(self: &mut Dapp): &mut StorageValue<address> {
        storage_migration::borrow_mut_field(&mut self.id, b"admin")
    }

    public fun borrow_package_id(self: &Dapp): &StorageValue<address> {
        storage_migration::borrow_field(&self.id, b"package_id")
    }

    public(package) fun borrow_mut_package_id(self: &mut Dapp): &mut StorageValue<address> {
        storage_migration::borrow_mut_field(&mut self.id, b"package_id")
    }

    public fun borrow_version(self: &Dapp): &StorageValue<u32> {
        storage_migration::borrow_field(&self.id, b"version")
    }

    public(package) fun borrow_mut_version(self: &mut Dapp): &mut StorageValue<u32> {
        storage_migration::borrow_mut_field(&mut self.id, b"version")
    }

    public fun borrow_metadata(self: &Dapp): &StorageValue<DappMetadata> {
        storage_migration::borrow_field(&self.id, b"metadata")
    }

    public(package) fun borrow_mut_metadata(self: &mut Dapp): &mut StorageValue<DappMetadata> {
        storage_migration::borrow_mut_field(&mut self.id, b"metadata")
    }

    public fun borrow_schemas(self: &Dapp): &StorageValue<vector<address>> {
        storage_migration::borrow_field(&self.id, b"schemas")
    }

    public(package) fun borrow_mut_schemas(self: &mut Dapp): &mut StorageValue<vector<address>> {
        storage_migration::borrow_mut_field(&mut self.id, b"schemas")
    }

    public fun borrow_safe_mode(self: &Dapp): &StorageValue<bool> {
        storage_migration::borrow_field(&self.id, b"safe_mode")
    }

    public(package) fun borrow_mut_safe_mode(self: &mut Dapp): &mut StorageValue<bool> {
        storage_migration::borrow_mut_field(&mut self.id, b"safe_mode")
    }

    public(package) fun create(ctx: &mut TxContext): Dapp {
        let mut id = object::new(ctx);
        storage_migration::add_field<StorageValue<address>>(&mut id, b"admin", storage_value::new());
        storage_migration::add_field<StorageValue<address>>(&mut id, b"package_id", storage_value::new());
        storage_migration::add_field<StorageValue<u32>>(&mut id, b"version", storage_value::new());
        storage_migration::add_field<StorageValue<DappMetadata>>(&mut id, b"metadata", storage_value::new());
        storage_migration::add_field<StorageValue<vector<address>>>(&mut id, b"schemas", storage_value::new());
        storage_migration::add_field<StorageValue<bool>>(&mut id, b"safe_mode", storage_value::new());
        Dapp { id }
    }

    public(package) fun upgrade<DappKey: drop>(dapp: &mut Dapp, ctx: &TxContext) {
        assert!(dapp.borrow_metadata().contains(), 0);
        assert!(dapp.borrow_admin().get() == ctx.sender(), 0);

        let new_package_id = type_info::current_package_id<DappKey>();
        dapp.borrow_mut_package_id().set(new_package_id);
        dapp.borrow_mut_version().mutate!(|version| {
        *version = *version + 1;
        });
    }

    public(package) fun add_schema<Schema: key + store>(dapp: &mut Dapp, schema: Schema, ctx: &TxContext) {
        assert!(dapp.borrow_metadata().contains(), 0);
        assert!(dapp.borrow_admin().get() == ctx.sender(), 0);

        let schema_id = object::id_address(&schema);
        dapp.borrow_mut_schemas().borrow_mut().push_back(schema_id);
        public_share_object(schema);
    }

    #[test_only]
    public fun create_dapp_for_testing(ctx: &mut TxContext): Dapp {
        create(ctx)
    }

    #[test_only]
    public fun distroy_dapp_for_testing(dapp: Dapp) {
       let Dapp { id } = dapp;
        id.delete();
    }
}
`;
		await formatAndWriteMove(
			code,
			path,
			'formatAndWriteMove'
		);
	}
}

async function generateDappSystem(config: DubheConfig, srcPrefix: string) {
	const path = `${srcPrefix}/contracts/${config.name}/sources/codegen/schemas/default/dapp/system.move`
	if (!existsSync(path)) {
		let code = `module ${config.name}::dapp_system {
    use std::ascii::String;
    use std::ascii;
    use dubhe::type_info;
    use sui::clock::Clock;
    use ${config.name}::dapp_schema;
    use ${config.name}::dapp_metadata;
    use ${config.name}::dapp_schema::Dapp;

    public struct DappKey has drop {}

    public(package) fun new(): DappKey {
        DappKey {  }
    }

    public(package) fun create(name: String, description: String, clock: &Clock, ctx: &mut TxContext): Dapp {
        let mut dapp = dapp_schema::create(ctx);
        assert!(!dapp.borrow_metadata().contains(), 0);
        dapp.borrow_mut_metadata().set(
            dapp_metadata::new(
                name,
                description,
                ascii::string(b""),
                ascii::string(b""),
                clock.timestamp_ms(),
                vector[]
            )
        );
        let package_id = type_info::current_package_id<DappKey>();
        dapp.borrow_mut_package_id().set(package_id);
        dapp.borrow_mut_admin().set(ctx.sender());
        dapp.borrow_mut_version().set(1);
        dapp.borrow_mut_safe_mode().set(false);
        dapp.borrow_mut_schemas().set(vector[]);
        dapp
    }

    public entry fun set_metadata(dapp: &mut Dapp, name: String, description: String, icon_url: String, website_url: String, partners: vector<String>, ctx: &TxContext) {
        assert!(dapp.borrow_admin().contains(), 0);
        assert!(dapp.borrow_admin().get() == ctx.sender(), 0);
        let created_at = dapp.borrow_mut_metadata().take().get_created_at();
        dapp.borrow_mut_metadata().set(
            dapp_metadata::new(
                name,
                description,
                icon_url,
                website_url,
                created_at,
                partners
            )
        );
    }

    public entry fun transfer_ownership(dapp: &mut Dapp, new_admin: address, ctx: &mut TxContext) {
        assert!(dapp.borrow_admin().contains(), 0);
        assert!(dapp.borrow_admin().get() == ctx.sender(), 0);

        dapp.borrow_mut_admin().set(new_admin);
    }

    public entry fun set_safe_mode(dapp: &mut Dapp, safe_mode: bool, ctx: &TxContext) {
        assert!(dapp.borrow_admin().contains(), 0);
        assert!(dapp.borrow_admin().get() == ctx.sender(), 0);

        dapp.borrow_mut_safe_mode().set(safe_mode);
    }

    public fun ensure_no_safe_mode(dapp: &Dapp) {
        assert!(!dapp.borrow_safe_mode().get(), 0);
    }

    public fun ensure_has_authority(dapp: &Dapp, ctx: &TxContext) {
        assert!(dapp.borrow_admin().get() == ctx.sender(), 0);
    }

    public fun ensure_has_schema<Schema: key + store>(dapp: &Dapp, schema: &Schema) {
        let schema_id = object::id_address(schema);
        assert!(dapp.borrow_schemas().get().contains(&schema_id), 0);
    }
}

`;
		await formatAndWriteMove(
			code,
			path,
			'formatAndWriteMove'
		);
	}
}