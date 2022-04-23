import DJPlayerOne from './DJPlayerOne';

export default {
  title: 'Component/DJPlayerOne',
  component: DJPlayerOne,
};

const Template = args => <DJPlayerOne {...args} />;

export const DJPlayerOneComplete = Template.bind({});
