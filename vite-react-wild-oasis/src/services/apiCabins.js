import supabase from "./supabase";

export async function getCabin(){
    const {data, error} = await supabase.from("cabins").select("*");
    if (error) {
        console.error(error);
        throw new Error("Couldn't loaded data from server");
    }
    return data;
}