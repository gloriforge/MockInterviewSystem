// Imported component from shadcn
import * as React from "react"
import { cn } from "@/lib/utils"

const Select = React.forwardRef(({ className, type, ...props }, ref) => {
    const {
        options
    } = props;
    return ((
        <select
            className={cn(
                "flex h-10 w-full rounded-md border cursor-pointer border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
                className
            )}
            ref={ref}
            onChange={props.onChange}
        >
            {
                options !== undefined && options.map((val) => {
                    // console.log(val);
                    return <option value={val}>{val}</option>
                })
            }
        </select>
    ));
})
Select.displayName = "select"

export { Select }
