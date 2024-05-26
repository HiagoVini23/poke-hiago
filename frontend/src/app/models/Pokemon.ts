export interface Pokemon{
    id: number
    name: string,
    favorite: boolean,
    image: string,
    stats: {
        base_stat: number;
    }[];
    height: number;
    weight: number;
}