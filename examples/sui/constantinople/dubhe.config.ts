import { DubheConfig } from '@0xobelisk/sui-common';

export const dubheConfig = {
	name: 'constantinople',
	description: 'constantinople contract',
	schemas: {
		entity: {
			data: [
				{ MonsterType: ["None", "Eagle", "Rat", "Caterpillar"] }
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
				{ CannotMove: "This entity cannot move" }
			]
		},
		map: {
			data: [
				{ Direction: ["North", "East", "South", "West"] },
				{ TerrainType: ["None", "TallGrass", "Boulder"] },
				{ Config: { width: "u64", height: "u64", terrain: "vector<vector<TerrainType>>" } },
				{ Position: { x: "u64", y: "u64" } },
			],
			structure: {
				config: 'StorageValue<Config>',
				position: 'StorageMap<address, Position>',

			},
			errors: [
				{ AlreadyRegistered: "This address is already registered" },
				{ NotRegistered: "This address is not registered" },
				{ SpaceObstructed: "This space is obstructed" },
			]
		},
		encounter : {
			data: [
				{ MonsterCatchResult: ["Missed", "Caught", "Fled"] },
				{ MonsterInfo: { monster: "address", catch_attempts: "u64" } }
			],
			structure: {
				monster_info: 'StorageMap<address, MonsterInfo>',
				encounter_trigger: 'StorageDoubleMap<u64, u64, bool>',
			},
			events: [
				{
					MonsterCatchAttempt: {
						player: 'address',
						monster: 'address',
						result: 'MonsterCatchResult',
					},
				},
			],
			errors: [
				{ NotInEncounter: "This player is not in an encounter" }
			]
		}
	},
} as DubheConfig;
