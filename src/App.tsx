import { useEffect, useState } from "react";
import { PokeAPI } from "./pokeapiClient";
import { Pokemon } from "pokeapi-js-wrapper";

interface PokemonCard {
  id: number;
  image: string;
  name: string;
  type: string[];
}

const typeColors: { [key: string]: string } = {
  fire: "bg-red-500",
  water: "bg-blue-500",
  grass: "bg-green-500",
  poison: "bg-purple-500",
  bug: "bg-green-500",
  normal: "bg-gray-500",
  dragon: "bg-purple-700",
  steel: "bg-gray-700",
  flying: "bg-indigo-400",
  rock: "bg-yellow-700",
  ground: "bg-yellow-500",
};

function getTypeColor(type: string) {
  return typeColors[type] || "bg-gray-300";
}

const Card = (props: PokemonCard) => {
  return (
    <div className="border p-5 m-7 bg-white rounded-lg shadow-md w-60 text-center">
      <h3 className="text-lg font-bold capitalize">{props.name}</h3>
      <img src={props.image} alt={props.name} className="w-24 h-24 mx-auto my-2" />
      <div className="flex space-x-2">
        {props.type.map((type) => (
          <span key={type} className={`p-2 text-white rounded ${getTypeColor(type)}`}>
            {type}
          </span>
        ))}
      </div>
    </div>
  );
};

export const App = () => {
  const [data, setData] = useState<PokemonCard[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await PokeAPI.getPokemonsList({ offset: 0, limit: 10 });
        const pokemonNames = response.results.map((item: { name: string }) => item.name);

        const pokemonDetails = await Promise.all(
          pokemonNames.map(async (name: string) => {
            const pokemon: Pokemon = await PokeAPI.getPokemonByName(name);
            return {
              id: pokemon.id,
              name: pokemon.name,
              image: pokemon.sprites.front_default ?? "https://via.placeholder.com/96",
              type: pokemon.types.map((t) => t.type.name),
            };
          })
        );

        setData(pokemonDetails);
      } catch (error) {
        console.error("Errore nel recupero dei Pokémon:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="flex flex-wrap bg-gray-100 p-4">
      {data.map((item) => (
        <Card key={item.id} {...item} />
      ))}
    </div>
  );
};

export const Detail = () => {
  return null;
};