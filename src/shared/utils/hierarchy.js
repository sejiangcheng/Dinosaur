import { HIERARCHY_TYPE } from "@/constants/hierarchy";
export function getHierarchyIcon(node) {
  const isAsset = node.IsAsset;
  switch (node.Type) {
    case HIERARCHY_TYPE.Customer:
      return "icon-customer";
    case HIERARCHY_TYPE.Organization:
      return "icon-orgnization";
    case HIERARCHY_TYPE.Site:
      return "icon-site";
    case HIERARCHY_TYPE.Building:
      return "icon-building";
    default:
      return "";
  }
}
