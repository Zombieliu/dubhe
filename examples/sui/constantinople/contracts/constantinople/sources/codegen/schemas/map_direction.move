  // Copyright (c) Obelisk Labs, Inc.
  // SPDX-License-Identifier: Apache-2.0
  #[allow(unused_use)]
  
  /* Autogenerated file. Do not edit manually. */
  
  module constantinople::map_direction {

  public enum Direction has copy, drop , store {
                                North,East,South,West
                        }

  public fun new_north(): Direction {
    Direction::North
  }

  public fun new_east(): Direction {
    Direction::East
  }

  public fun new_south(): Direction {
    Direction::South
  }

  public fun new_west(): Direction {
    Direction::West
  }
}
