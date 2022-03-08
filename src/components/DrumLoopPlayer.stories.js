import DrumLoopPlayer from "./DrumLoopPlayer";


export default {
  title: 'Component/DrumLoopPlayer',
  component: DrumLoopPlayer,
};
    
const Template = args => <DrumLoopPlayer {...args}/>;
    
export const DrumPadComplete = Template.bind({});