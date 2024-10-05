"use client";

import CardService from "@/components/ui/card_service";
import Search from "@/components/ui/search";
import SelectCategory from "@/components/ui/select_category";

const services = () => {
    return (
        <div className="all__services">
            <div className="header__services">
                <Search />
                <SelectCategory />
            </div> 
        <div className="main__services">
            <CardService />
        </div>
    </div>
     );
}
 
export default services;