import DJPlayer from './DJPlayer';


export default {
  title: 'Component/DJPlayer',
  component: DJPlayer,
};

const Template = args => <DJPlayer {...args} />;

export const DrumLoopPlayerComplete = Template.bind({});

