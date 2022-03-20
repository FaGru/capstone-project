import RecordButton from './RecordButton';

export default {
  title: 'Component/RecordButton',
  component: RecordButton,
};

const Template = args => <RecordButton {...args} />;

export const RecordButtonComplete = Template.bind({});
RecordButtonComplete.args = {
  devicesState: 'stop',
};
