export let VIPER_URL = "https://nigeriauat.reliablesoftjm.com/";
export const PREVIEW_URL = "https://obi.reliablesoftjm.com/";
// http://obireact.mentem.in

export const VIPER_CONST = {
    base_url: VIPER_URL + "VIPERWS/",
    alwaysOnUsername: "esite3@viponline",
    alwaysOnSessionid: "00009223581026309436128527",
};

export type PrivilegeType = {
    value: string;
    label: string;
  };

  export const PRIVILIGES_TYPE: PrivilegeType[] = [
    { value: "THEMEEDITOR", label: "Editor" },
    { value: "THEMEPUBLISHER", label: "Publisher" },
  ];

export const THEMEEDITOR = "THEMEEDITOR";
export const THEMEPUBLISHER = "THEMEPUBLISHER";
