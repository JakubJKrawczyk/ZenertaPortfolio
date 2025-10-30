import type {Vector2} from "three";
import type {ReactNode} from "react";


export default class SectionModel{

    constructor(_size: Vector2, _content: ReactNode, _color: string, _id?: string, _className?: string){
        this.content = _content;
        this.color = _color;
        this.size = _size;
        this.id = _id;
        this.className = _className
    }

    public content: ReactNode
    public color: string
    public id?: string
    public size: Vector2
    public className?: string
}