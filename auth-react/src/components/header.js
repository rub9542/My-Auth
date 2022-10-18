import React from 'react';

const Header = () => {
  return (
    <div className='flex header flex-center'>
      <svg
        width='125'
        height='25'
        viewBox='0 0 125 25'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        xmlnsXlink='http://www.w3.org/1999/xlink'
      >
        <rect y='0.5' width='125' height='24' fill='url(#pattern0)' />
        <defs>
          <pattern
            id='pattern0'
            patternContentUnits='objectBoundingBox'
            width='1'
            height='1'
          >
            <use
              xlinkHref='#image0_1266_41296'
              transform='translate(0 -0.001002) scale(0.00200401 0.0104375)'
            />
          </pattern>
          <image
            id='image0_1266_41296'
            width='499'
            height='96'
            xlinkHref='data:image/png;base64,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'
          />
        </defs>
      </svg>
    </div>
  );
};

export default Header;
