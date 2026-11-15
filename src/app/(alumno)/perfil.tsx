import { View } from "react-native";
import { useQueryClient } from "@tanstack/react-query";
import { useSession, useStudentId } from "~contexts/session";
import { messages } from "~messages";
import { useFeedback } from "~services/feedback";
import { useFlowNavigation } from "~services/navigation";
import { Avatar } from "~sharing/atoms/avatar";
import { Button } from "~sharing/atoms/button";
import { Text } from "~sharing/atoms/text";
import { InfoCard } from "~sharing/molecules/info-card";
import { StepScreen } from "~sharing/organisms/step-screen";
import { createStyles, spacing } from "~styles";
import { formatDate } from "~utils/format-date";
import { maskPhone } from "~utils/mask-phone";

import { useRemovePhoto, useStudent } from "~queries";

const useStyles = createStyles(() => ({
	section: { gap: spacing.md },
}));

export default function ProfileScreen() {
	const styles = useStyles();
	const client = useQueryClient();
	const feedback = useFeedback();
	const { back } = useFlowNavigation();
	const { signOut } = useSession();
	const studentId = useStudentId();
	const student = useStudent(studentId);
	const removePhoto = useRemovePhoto(studentId);
	const copy = messages.profile;
	const profile = student.data;

	return (
		<StepScreen
			eyebrow={copy.eyebrow}
			title={profile?.name ?? ""}
			hint={profile ? maskPhone(profile.phone) : undefined}
			onBack={back}
			loading={!profile}
			secondaryAction={{
				label: copy.signOut,
				icon: "logout",
				onPress: () => {
					client.clear();
					signOut();
				},
			}}
		>
			{profile ? (
				<>
					<Avatar name={profile.name} photo={profile.photo} size="lg" />
					{profile.helpers?.length ? (
						<InfoCard
							title={copy.helpers}
							lines={profile.helpers.map((helper) => ({
								label: helper.relation,
								value: `${helper.name} · ${maskPhone(helper.phone)}`,
							}))}
						/>
					) : (
						<Text tone="mutedForeground">{copy.noHelpers}</Text>
					)}
					<View style={styles.section}>
						<Text variant="lead" bold role="heading">
							{copy.photo}
						</Text>
						<Text>
							{profile.photo
								? copy.photoGranted(formatDate(profile.photo.grantedAt))
								: copy.noPhoto}
						</Text>
						{profile.photo ? (
							<Button
								variant="destructive"
								icon="image-remove"
								label={copy.removePhoto}
								busy={removePhoto.isPending}
								onPress={() =>
									removePhoto.mutate(undefined, {
										onSuccess: () => feedback.success(copy.photoRemoved),
									})
								}
							/>
						) : null}
					</View>
				</>
			) : null}
		</StepScreen>
	);
}
