import React, { useState } from 'react';
import { range } from 'lodash';
import { Breadcrumb } from './components/Breadcrumb';

const Sample = (props: {
  width: number | 'auto';
  count: number;
  label: string;
}) => (
  <div style={{ width: props.width, marginBottom: 10 }}>
    <Breadcrumb>
      {range(props.count).map((i) => (
        <div
          key={i}
          style={{
            padding: 3,
            borderRadius: 3,
            backgroundColor: i === 0 ? '#eeeef1' : undefined,
            overflow: 'visible',
          }}
        >
          {props.label} {i + 1}
        </div>
      ))}
    </Breadcrumb>
  </div>
);

const App = () => {
  const counts = [1, 2, 3, 5, 10, 20, 100];

  const [shortName, setShortName] = useState<boolean>(true);
  const label = shortName ? 'Thing' : 'Thingamajigs';

  const SampleGroup = (props: {
    count: number;
    widths: Array<number | 'auto'>;
    heading?: string;
  }) => {
    const { count, widths, heading } = props;
    const sharedProps = { count, label };

    return (
      <div key={count}>
        <h3>{heading || `${count} Item`}</h3>

        {widths.map((width) => (
          <Sample width={width} {...sharedProps} />
        ))}
      </div>
    );
  };

  return (
    <>
      <button onClick={() => setShortName(!shortName)}>
        Toggle Item Length
      </button>

      {/* edge cases */}
      <SampleGroup heading={'Empty Set'} count={0} widths={['auto']} />
      <SampleGroup heading={'Tiny Parent'} count={2} widths={[10]} />

      {/* basic examples */}
      {counts.map((count) => (
        <SampleGroup count={count} widths={[250, 'auto']} />
      ))}
    </>
  );
};

export default App;
