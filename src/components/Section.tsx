import type SectionModel from "../models/SectionModel.tsx";

export default function HtmlSection(section: SectionModel){

    return (
        <>
            <div className={section.className !== null ? section.className : ""} id={section.id !== null ? section.id : ""}>
                {section.content}
            </div>
        </>
    )
}