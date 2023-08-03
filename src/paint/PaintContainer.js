import { useState } from "react";
import { PaintSearch } from "./PaintSearch";
import { PaintList } from "./PaintList";

export const PaintContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")

    return <>
        <PaintSearch setterFunction={setSearchTerms}/>
        <PaintList searchTerms={searchTerms}/>
    </>
}