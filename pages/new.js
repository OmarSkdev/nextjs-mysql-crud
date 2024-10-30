import { Layout } from "../components/Layout";
import { ProductForm } from "../components/ProductForm";

function NewPage() {
    return (
        <Layout>
            <div className="grid place-items-center">
                <ProductForm /> 
            </div>
                
        </Layout>
    );
}   

export default NewPage;