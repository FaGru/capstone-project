import SequencerPad from './SequencerPad';

export default {
  title: 'Component/SequencerPad',
  component: SequencerPad,
};

const Template = args => <SequencerPad {...args} />;

export const SequencerPadComplete = Template.bind({});
SequencerPadComplete.args = {
  color: "purple",
  isActive: true,
  selectedPad: 1,
};
