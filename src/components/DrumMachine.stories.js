import DrumMachine from './DrumMachine';


export default {
  title: 'Component/DrumMachine',
  component: DrumMachine,
};
    
const Template = args => <DrumMachine {...args}/>;
    
export const DrumMachineComplete = Template.bind({});