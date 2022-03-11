import DrumPad from "./DrumPad";


export default {
  title: 'Component/DrumPad',
  component: DrumPad,
};
    
const Template = args => <DrumPad {...args}/>;
    
export const DrumPadComplete = Template.bind({});
DrumPadComplete.args = {id: '1', color: 'yellow', sample: './audio/Samples/Scratch1.wav'}
    
  

