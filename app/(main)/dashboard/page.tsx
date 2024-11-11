import { Card, CardContent } from "@/components/ui/card";

export default function page() {
  return (
    <Card className="p-0">
      <CardContent className="p-0 ">
        <iframe
          width="800"
          height="600"
          className="size-full min-h-[450px] "
          src="https://app.powerbi.com/singleSignOn?ru=https%3A%2F%2Fapp.powerbi.com%2F%3FnoSignUpCheck%3D1"
          allowFullScreen
          title="Power BI Report"
        />
      </CardContent>
    </Card>
  );
}
