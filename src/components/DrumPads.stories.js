import DrumPads from "./DrumPads";


export default {
  title: 'Component/DrumPads',
  component: DrumPads,
};
    
const Template = args => <DrumPads {...args}/>;
    
export const DrumPadsComplete = Template.bind({});