import DrumPad from "./DrumPad";


export default {
  title: 'Component/DrumPad',
  component: DrumPad,
};
    
const Template = args => <DrumPad {...args}/>;
    
export const DrumPadComplete = Template.bind({});