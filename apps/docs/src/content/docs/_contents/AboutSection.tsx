import { FaRegCircleCheck } from "react-icons/fa6";

import Card from "../../../components/Card";
import Text from "../../../components/Text";
import Stack from "../../../components/Stack";

const FEATURES = [
  "Easier configuration",
  "Less component imports",
  "Bring your own components",
  "Makes your component TypeSafe",
];

const AboutSection = () => {
  return (
    <div className="not-content">
      <Card className="bg-black-800 rounded-3xl max-w-full">
        <Stack gap={14}>
          <Stack className="text-white">
            <Text size="display" weight="semibold">
              Why choose react-geek-form?
            </Text>
            <Text size="body-large">
              Discover the advantages that make our library stand out.
            </Text>
          </Stack>
          <Stack gap={2}>
            {FEATURES.map((f, i) => (
              <Stack key={i} horizontal gap={4} align="center">
                <FaRegCircleCheck className="w-4 h-4 text-green-400" />
                <Text size="lead" className="text-white" weight="medium">
                  {f}
                </Text>
              </Stack>
            ))}
          </Stack>
        </Stack>
      </Card>
    </div>
  );
};

export default AboutSection;
