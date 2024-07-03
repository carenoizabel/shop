export default async function Product({params}){
    const response = await fetch("https://fakestoreapi.com/products/" + params.id);
    const data = await response.json();
    return(
        <p>{data.title}</p>
    );
}