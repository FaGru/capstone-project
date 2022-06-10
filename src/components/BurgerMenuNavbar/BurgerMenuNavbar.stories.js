import BurgerMenuNavbar from './BurgerMenuNavbar';

export default {
  title: 'Component/BurgerMenuNavbar',
  component: BurgerMenuNavbar,
};

const Template = args => <BurgerMenuNavbar {...args} />;

export const BurgerMenuNavbarComplete = Template.bind({});
