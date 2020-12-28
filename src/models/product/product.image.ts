export interface ProductImage {
    id?: number;	//Image ID.
    date_created?: Date	//The date the image was created, in the site's timezone.READ-ONLY
    date_created_gmt?: Date//	The date the image was created, as GMT.READ-ONLY
    date_modified?: Date;///	The date the image was last modified, in the site's timezone.READ-ONLY
    date_modified_gmt?: Date;	///The date the image was last modified, as GMT.READ-ONLY
    src?: string;	//Image URL.
    name?: string //	Image name.
    alt?: string;	//Image //alternative text.
}