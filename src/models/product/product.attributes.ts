export interface ProductAttributes {
    id?: number	//Attribute ID.
    name?: string	//Attribute name.
    position?: number//	Attribute position.
    visible?: boolean	//Define if the attribute is visible on the "Additional information" tab in the product's page. Default is false.
    variation?: boolean	//Define if the attribute can be used as variation. Default is false.
    options?: string[];//	List of available term names of the attribute.
}