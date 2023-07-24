import { Text, View } from 'react-native';
import SVG, {Circle} from 'react-native-svg';
import Animated, {useAnimatedProps} from 'react-native-reanimated';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

type RingProgressProps = {
    radius?: number;
    strokeWidth?:number;
    progress: number;
};

const color = '#EE0F55';

const RingProgress = ({ radius = 100, strokeWidth=35, progress }: RingProgressProps) => {

    const innerRadius = radius - strokeWidth /2;
    const circumference = 2*Math.PI*innerRadius;

    const animatedProps = useAnimatedProps(() => ({
        strokeDasharray: [circumference * progress, circumference]
    }))
    return (

        <View style={{ width: radius * 2, height: radius * 2, alignSelf: 'center', 
        //backgroundColor: 'green' 
        }}>
            <SVG>
                {/* Backgroung */}
                <Circle cx={radius} cy={radius}  r={innerRadius} strokeWidth={strokeWidth} stroke={color}
                //fill={'blue'}
                opacity={0.2}
                ></Circle>
                {/* Foreground */}
                <AnimatedCircle cx={radius} cy={radius}  r={innerRadius} strokeWidth={strokeWidth} stroke={color}
                //fill={'blue'}
                animatedProps={animatedProps}
                strokeLinecap='round'
                rotation="-90"
                originX={radius}
                originY={radius}
                ></AnimatedCircle>
            </SVG>
        </View>
    );
};

export default RingProgress;