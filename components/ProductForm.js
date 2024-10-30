import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export function ProductForm() {

    const [product, setProduct] = useState({
        name: "",
        description: "",
        price: 0,
    });

    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (router.query.id) {
                //console.log('update');
                await axios.put('/api/products/'+ router.query.id, product) 
                //console.log(res);
                toast.success("Producto Actualizado exitosamente")                      
            } else {
                await axios.post("/api/products", product)
                //console.log(res);
                toast.success("Producto agregado exitosamente")                      

            }        
            router.push('/')
        } catch (error) {
            toast.error(error.response.data.message)            
        }
        
    };
    
    const handleChange = ({ target: { name, value } }) => {
        //console.log(e.target.name, e.target.value);
        setProduct({...product, [name]:value }) 
    } 

    useEffect(() => {
        const getProduct = async () => {
            const { data } = await axios.get('/api/products/' + router.query.id)
            //console.log(res);
            setProduct(data)
                       
        }
        if (router.query.id) {
            //console.log(router.query.id);
            getProduct(router.query.id)            
        }        
    }, [])

    return (
        <div className="w-full max-w-xs">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label 
                        htmlFor="name" 
                        className="block text-gray-700 text-sm font-bold mb-2">Nombre:
                    </label>
                    <input
                        type="text"
                        name="name"
                        onChange={handleChange}
                        className="shadow appearance-none border w-full rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={product.name} />
                </div>

                <div className="mb-4">
                    <label 
                        htmlFor="price"
                        className="block text-gray-700 text-sm font-bold mb-2">Precio:
                    </label>
                    <input
                        type="text"
                        name="price"
                        id="price" onChange={handleChange}
                        className="shadow appearance-none border w-full rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={product.price} />
                </div>                
                

                <label 
                    htmlFor="description"
                    className="block text-gray-700 text-sm font-bold mb-2"
                >Descripción:</label>
                <textarea
                    name="description"
                    rows="2"
                    onChange={handleChange}
                    className="shadow appearance-none border w-full rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

                    value={product.description}>
                </textarea>

                <button
                    className="bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded focus:outline-none 
                    focus:shadow-outline font-bold text-white">
                    {router.query.id ? "Actualizar Producto" : "Guardar Producto"}
                </button>
            </form>
        </div>
    )
}

