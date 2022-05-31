import SequencerSettings from './SequencerSettings';

export default {
  title: 'Component/SequencerSettings',
  component: SequencerSettings,
};

const Template = args => <SequencerSettings {...args} />;

export const SequencerSettingsComplete = Template.bind({});
SequencerSettingsComplete.args = {
  isSettingsVisible: 'true',
  currentSequencerBpm: 100,
};
