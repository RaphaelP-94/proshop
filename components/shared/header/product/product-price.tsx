import { cn } from "@/lib/utils"; 
const ProductPrice = ({value, className}: {value: number, className?: string}) => {
    // ensure two decimal places
    const stringValue = value.toFixed(2);
    // get the integer part and floating part; Destructuring the value
    const [intValue, floatValue] = stringValue.split('.');
    // Set dynamic class names based on the integer part
    // We can add classnames in the productcard component which then gets applied
    return ( <>
        <p className={cn('text-2xl', className)}>
            <span className="text-xs align-super">$</span>
            {intValue}
            <span className="text-xs align-super">.{floatValue}</span>

        </p>
    </> );
}
 
export default ProductPrice;