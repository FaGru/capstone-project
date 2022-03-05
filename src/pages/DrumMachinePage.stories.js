import DrumMachine from './DrumMachinePage';


export default {
  title: 'Pages/DrumMachine',
  component: DrumMachine,
};
    
const Template = args => <DrumMachine {...args}/>;
    
export const DrumMachineComplete = Template.bind({});