import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ProductPrice from "./product-price";
import { Product } from "@/types";

const ProductCard = ({product}: {product: Product}) => {
    return ( <>
    <Card className="w-full max-w-sm">
        <CardHeader className="p-0 items-center">
            <Link href={`/product/${product.slug}`}>
                <Image src={product.images[0]} alt={product.name} width={300} height={300} className="w-full h-auto object-cover" />
            </Link>
        </CardHeader>
        <CardContent className="p-4 grid gap-4">
            <div className="text-xs">{product.brand}</div>
            <Link href={`/product/${product.slug}`}><h2 className="text-sm font-medium">{product.name}</h2></Link>
            <div className="flex-between gap-4">
               <p>{product.rating} Stars</p>
                {/* Check if product is in stock*/}     
                { product.stock > 0 ? (
            <ProductPrice value={Number(product.price)}/>
                ) : (
                    <p className="text-xs text-destructive">Out of Stock</p>
                )}
                </div>
        </CardContent>
    </Card>
    </>
    );
} 
export default ProductCard;