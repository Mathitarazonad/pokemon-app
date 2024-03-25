export interface PokemonTypeDetails {
  damage_relations: DamageRelations
}

export interface DamageRelations {
  double_damage_from: DoubleDamageFrom[]
  double_damage_to: DoubleDamageTo[]
}

export interface DoubleDamageFrom {
  name: PokemonType
  url: string
}

export interface DoubleDamageTo {
  name: PokemonType
  url: string
}
