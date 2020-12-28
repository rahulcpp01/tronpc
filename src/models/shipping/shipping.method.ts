export interface ShippingMethod {
    instance_id: number //	integer	Shipping method instance ID.READ-ONLY
    title: string	//Shipping method customer facing title.READ-ONLY
    order: number //	Shipping method sort order.
    enabled: boolean	//Shipping method enabled status.
    method_id: string//	Shipping method ID.READ-ONLYMANDATORY
    method_title: string	//Shipping method title.READ-ONLY
    method_description: string	//Shipping method description.READ-ONLY
    settings?: {
      cost?: {
        id:	string //	A unique identifier for the setting.READ-ONLY
        label: string	//A human readable label for the setting used in interfaces.READ-ONLY
        description: string	//A human readable description for the setting used in interfaces.READ-ONLY
        type: string	//Type of setting. Options: text, email, number, color, password, textarea, select, multiselect, radio, image_width and checkbox.READ-ONLY
        value?: string	//Setting value.
        default: string	//Default value for the setting.READ-ONLY
        tip: string	//Additional help text shown to the user about the setting.READ-ONLY
        placeholder: string //	Placeholder text to be displayed in text inputs.
      }
    } 
}