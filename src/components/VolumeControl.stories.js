import VolumeControl from "./VolumeControl";


export default {
  title: 'Component/VolumeControl',
  component: VolumeControl,
};
    
const Template = (args) => <VolumeControl {...args}/>;
    
export const VolumeControlComplete = Template.bind({});
VolumeControlComplete.args =  {
  isControlsVisible: "true"
}