import PlusIcon from './icon';

// Register the component
customElements.define('plus-icon', PlusIcon);

export { default as PlusIcon } from './icon';
export * from './icon-registry';
export type {
  IconName,
  IconStyle,
  CoreIcon,
  CoreSolidIcon,
  CoreRegularIcon,
  CoreLightIcon,
} from './icon-registry';
