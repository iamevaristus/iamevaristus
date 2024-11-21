import React from 'react';
import { Theme } from '../../configuration/theme/Theme';
import { Column } from './Column';
import { SizedBox } from './Flex';
import { Image } from './Image';
import { Text } from './Text';

export interface ICarousel {
    text?: string;
    image: string;
}

interface CarouselViewProps {
    items: ICarousel[];
    initialHeight?: number;
    initialWidth?: number;
    fallbackHeight?: number;
    fallbackWidth?: number;
    autoplay?: boolean;
    scrollDirection?: 'horizontal' | 'vertical';
    borderRadius?: string;
    spacing?: number;
    duration?: number;
    position?: 'bottom' | 'top';
    align?: 'left' | 'right' | 'center';
    option?: 'directional' | 'bi-directional',
    padding?: string;
    backgroundColor?: string;
}

export const CarouselView: React.FC<CarouselViewProps> = ({
    items,
    initialHeight = 200,
    initialWidth = 200,
    fallbackHeight = 50,
    fallbackWidth = 50,
    autoplay = false,
    scrollDirection = 'horizontal',
    borderRadius = "0",
    spacing = 5,
    duration = 2000,
    position = 'bottom',
    align = 'left',
    option = 'bi-directional',
    padding,
    backgroundColor
}) => {
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [direction, setDirection] = React.useState<'forward' | 'backward'>('forward');
    const containerRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (autoplay) {
            if(option === 'bi-directional') {
                const interval = setInterval(() => {
                    setCurrentIndex((prevIndex) => {
                        if (direction === 'forward') {
                            if (prevIndex === items.length - 1) {
                                setDirection('backward');
                                return prevIndex - 1;
                            }
                            return prevIndex + 1;
                        } else {
                            if (prevIndex === 0) {
                                setDirection('forward');
                                return prevIndex + 1;
                            }
                            return prevIndex - 1;
                        }
                    });
                }, duration);
                return () => clearInterval(interval);
            } else {
                const interval = setInterval(() => {
                    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
                }, duration);
                return () => clearInterval(interval);
            }
        }
    }, [autoplay, direction, items.length, duration, option]);

    React.useEffect(() => {
        const container = containerRef.current;
        if (container) {
            const currentItem = container.children[currentIndex] as HTMLElement;
            if (currentItem) {
                const offset = scrollDirection === 'horizontal'
                    ? currentItem.offsetLeft - (container.clientWidth - currentItem.clientWidth) / 2
                    : currentItem.offsetTop - (container.clientHeight - currentItem.clientHeight) / 2;

                if (scrollDirection === 'horizontal') {
                    container.scrollTo({
                        left: offset,
                        behavior: 'smooth'
                    });
                } else {
                    container.scrollTo({
                        top: offset,
                        behavior: 'smooth'
                    });
                }
            }
        }
    }, [currentIndex, scrollDirection]);

    const transition = duration / 4000;

    return (
        <div
            ref={containerRef}
            // onScroll={handleScroll}
            style={{
                display: 'flex',
                flexDirection: scrollDirection === 'horizontal' ? 'row' : 'column',
                overflowX: scrollDirection === 'horizontal' ? 'scroll' : 'hidden',
                overflowY: scrollDirection === 'vertical' ? 'scroll' : 'hidden',
                alignItems: position === 'top' ? 'flex-start' : 'flex-end',
                justifyContent: align === 'left' ? 'flex-start' : align === 'right' ? 'flex-end' : 'center',
                width: '100%',
                height: 'auto',
            }}
        >
            {items.map((item, index) => {
                const isCurrent = index === currentIndex;
                const height = isCurrent ? initialHeight : fallbackHeight;
                const width = isCurrent ? initialWidth : fallbackWidth;

                return (
                    <React.Fragment key={index}>
                        <Column crossAxis='center'>
                            <Image
                                image={item.image}
                                objectFit='contain'
                                style={{
                                    transition: `all ${transition}s ease-in-out`,
                                    height: `${height}px`,
                                    width: `${width}px`,
                                    flexShrink: 0,
                                    borderRadius: isCurrent ? borderRadius : "50%",
                                    marginRight: items.length - 1 !== index ? `${spacing}px` : 0,
                                    transformOrigin: position === 'bottom' ? 'bottom center' : 'top center',
                                    backgroundColor,
                                    padding,
                                    // transform: isCurrent ? 'scale(1)' : `scale(${fallbackHeight / initialHeight}, ${fallbackWidth / initialWidth})`,
                                }}
                                height={height}
                                width={width}
                            />
                            {item.text && <SizedBox height={30} />}
                            {item.text && <Text text={item.text} size={14} color={backgroundColor ?? Theme.primary} />}
                        </Column>
                    </React.Fragment>
                );
            })}
        </div>
    );
};