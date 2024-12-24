import { DubheConfig } from '@0xobelisk/sui-common';

export const dubheConfig = {
	name: 'constantinople',
	description: 'constantinople contract',
	schemas: {
		entity: {
			data: [
				{
					name: "MonsterType",
					fields: ["None", "Eagle", "Rat", "Caterpillar"],
				}
			],
			structure: {
				player: 'StorageMap<address, bool>',
				monster: 'StorageMap<address, MonsterType>',
				obstruction: 'StorageMap<address, bool>',
				owned_by: 'StorageMap<address, address>',
				encounterable: 'StorageMap<address, bool>',
				moveable: 'StorageMap<address, bool>',
			},
			errors: [
				{
					name: "CannotMove",
					message: "This entity cannot move",
				}
			]
		},
		map: {
			data: [
				{
					name: "Direction",
					fields: ["North", "East", "South", "West"],
				},
				{
					name: "TerrainType",
					fields: ["None", "TallGrass", "Boulder"],
				},

				{
					name: "Config",
					fields: {
						width: "u64",
						height: "u64",
						terrain: "vector<vector<TerrainType>>",
					}
				},
				{
					name: "Position",
					fields: {
						x: "u64",
						y: "u64",
					}
				},
			],
			structure: {
				config: 'StorageValue<Config>',
				position: 'StorageMap<address, Position>',

			},
			errors: [
				{
					name: 'AlreadyRegistered',
					message: "This address is already registered",
				},
				{
					name: 'NotRegistered',
					message: "This address is not registered",
				},
				{
					name: 'SpaceObstructed',
					message: "This space is obstructed",
				},
			]
		},
		encounter : {
			data: [
				{
					name: "MonsterCatchResult",
					fields: ["Missed", "Caught", "Fled"],
				},
				{
					name: "MonsterInfo",
					fields: {
						monster: "address",
						catch_attempts: "u64",
					}
				}
			],
			structure: {
				monster_info: 'StorageMap<address, MonsterInfo>',
				encounter_trigger: 'StorageDoubleMap<u64, u64, bool>',
			},
			events: [
				{
					name: 'MonsterCatchAttempt',
					fields: {
						player: 'address',
						monster: 'address',
						result: 'MonsterCatchResult',
					},
				},
			],
			errors: [
				{
					name: "NotInEncounter",
					message: "This player is not in an encounter",
				}
			]
		}
	},
} as DubheConfig;
