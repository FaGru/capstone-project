import DrumLoopPlayer from './DrumLoopPlayer';
import playbutton from '../../images/play.svg';


export default {
  title: 'Component/DrumLoopPlayer',
  component: DrumLoopPlayer,
};

const Template = args => <DrumLoopPlayer {...args} />;

export const DrumLoopPlayerComplete = Template.bind({});
DrumLoopPlayerComplete.args = { 
  isPlayin: playbutton,
 };
