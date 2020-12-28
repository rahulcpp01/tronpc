import { ExpandOperator } from "rxjs/internal/operators/expand";

export interface CustomerMeta {
    id: number	//Meta ID.READ-ONLY
    key: string	//Meta key.
    value: string	//Meta value.
}