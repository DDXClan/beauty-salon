"use client";

import * as React from "react";
import CardService from "@/components/ui/card_service";
import Search from "@/components/ui/search";
import SelectCategory from "@/components/ui/select_category";
import { Loading } from "@/components/loading";

const Services = () => {
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 900); 
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="all__services">
            <div className="header__services">
                {/* <Search />
                <SelectCategory /> */}
            </div> 
            <div className="main__services">
                {loading ? <Loading /> : <CardService />} 
            </div>
        </div>
    );
}

export default Services;
