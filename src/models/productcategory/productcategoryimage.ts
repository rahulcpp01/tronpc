export interface ProductCategoryImage {
    id: number;
    date_created: Date; //	date-time	The date the image was created, in the site's timezone.READ-ONLY
    date_created_gmt: Date; // 	date-time	The date the image was created, as GMTREAD-ONLY
    date_modified: Date; //	date-time	The date the image was last modified, in the site's timezone.READ-ONLY
    date_modified_gmt: Date;  //	date-time	The date the image was last modified, as GMT.READ-ONLY
    src: string//	Image URL.
    name: string	//Image name.
    alt: string
}
