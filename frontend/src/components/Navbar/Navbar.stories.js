import Navbar from './Navbar.js';

export default {
  title: 'Component/Navbar',
  component: Navbar,
};

const Template = args => <Navbar {...args} />;

export const NavbarComplete = Template.bind({});
