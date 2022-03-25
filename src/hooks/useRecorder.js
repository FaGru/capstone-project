import useStore from './useStore';
import { useMemo, useEffect } from 'react';
import { nanoid } from 'nanoid';

const useRecorder = () => {
  const dest = useStore(state => state.dest);
  const recorder = useStore(state => state.recorder);

  // const [dest, setDest] = useState(null);
  // const dest = useMemo(() => Tone.context.createMediaStreamDestination(), []);
  // eslint-disable-next-line react-hooks/exhaustive-deps

  const chunks = useMemo(() => [], []);

  useEffect(() => {
    const handleUserInteraction = () => {
      const tone = useStore.getState().tone;
      if (!tone) {
        useStore.getState().initTone();
      }
    };
    window.addEventListener('mousemove', handleUserInteraction);
    return () => {
      window.removeEventListener('mousemove', handleUserInteraction);
    };
  }, []);

  useEffect(() => {
    if (recorder) {
      console.log('im useRecorder', recorder);
      recorder.ondataavailable = event => chunks.push(event.data);
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/mp3; codecs=opus' });
        const audio = URL.createObjectURL(blob);
        useStore.getState().addRecording({
          id: nanoid(),
          audio: audio,
        });
      };
    }
  }, [chunks, recorder, dest]);
};
export default useRecorder;
